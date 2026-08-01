--!strict
--[[
	UIBuilder — turns a ui-forge spec table into Roblox Instances.

	The spec stays data on this side too, so the shipped tree is isomorphic to
	the one the HTML preview measured. If this file flattened specs into
	imperative construction, the two representations could drift and nothing
	would catch it.

	Every mapping here is the counterpart of one in src/transpile/to-html.mjs.
	When you change one, change the other, or calibration will diverge.
]]

local TweenService = game:GetService("TweenService")

local UIBuilder = {}

-- Viewport classes must match src/cli.mjs VIEWPORTS, since the responsive
-- overrides in a spec were authored and validated against those breakpoints.
local BREAKPOINTS = {
	{ name = "mobile", maxWidth = 1000 },
	{ name = "tablet", maxWidth = 1500 },
	{ name = "desktop", maxWidth = math.huge },
}

local EASING = {
	linear = Enum.EasingStyle.Linear,
	quad = Enum.EasingStyle.Quad,
	cubic = Enum.EasingStyle.Cubic,
	quart = Enum.EasingStyle.Quart,
	back = Enum.EasingStyle.Back,
	elastic = Enum.EasingStyle.Elastic,
}

--[[ ---------------------------------------------------------------- utils ]]

local function hexToColor3(hex: string): Color3
	local h = hex:gsub("#", "")
	return Color3.fromRGB(
		tonumber(h:sub(1, 2), 16) or 0,
		tonumber(h:sub(3, 4), 16) or 0,
		tonumber(h:sub(5, 6), 16) or 0
	)
end

--[[
	Resolve a dotted token reference against the theme.

	Throws on a miss rather than falling back. A silent default is exactly how an
	invented colour reaches production, which is the failure the token system
	exists to prevent — same contract as resolveToken in the JS side.
]]
local function resolveToken(theme, ref)
	if type(ref) == "number" then
		return ref
	end
	assert(type(ref) == "string", "token ref must be string or number")

	-- Colours live one level deeper than their ref implies.
	for _, root in { theme.color, theme } do
		local cur = root
		local ok = true
		for segment in ref:gmatch("[^%.]+") do
			if type(cur) == "table" and cur[segment] ~= nil then
				cur = cur[segment]
			else
				ok = false
				break
			end
		end
		if ok and cur ~= nil then
			return cur
		end
	end
	error(string.format('ui-forge: unknown token "%s"', ref))
end

local function color(theme, ref): Color3
	local v = resolveToken(theme, ref)
	return if typeof(v) == "Color3" then v else hexToColor3(v)
end

local function udim2(t): UDim2
	if not t then
		return UDim2.new()
	end
	return UDim2.new(t[1] or 0, t[2] or 0, t[3] or 0, t[4] or 0)
end

local function px(theme, v): number
	return if type(v) == "string" then resolveToken(theme, v) else (v or 0)
end

local function viewportClass(): string
	local camera = workspace.CurrentCamera
	local width = if camera then camera.ViewportSize.X else 1920
	for _, bp in BREAKPOINTS do
		if width <= bp.maxWidth then
			return bp.name
		end
	end
	return "desktop"
end

--[[ ------------------------------------------------------------ modifiers ]]

local function applyCorner(inst, theme, node)
	if node.corner == nil then
		return
	end
	local r = resolveToken(theme, node.corner)
	local c = Instance.new("UICorner")
	-- 999 is the spec's "pill" sentinel; Scale 0.5 is a true capsule.
	c.CornerRadius = if r >= 999 then UDim.new(0.5, 0) else UDim.new(0, r)
	c.Parent = inst
end

local function applyStroke(inst, theme, node)
	if not node.stroke then
		return
	end
	local s = Instance.new("UIStroke")
	s.Color = color(theme, node.stroke.color)
	s.Thickness = px(theme, node.stroke.thickness)
	s.Transparency = node.stroke.transparency or 0
	-- Border mode keeps the stroke outside the fill, matching CSS `outline`,
	-- which is why the preview uses outline rather than border.
	s.ApplyStrokeMode = Enum.ApplyStrokeMode.Border
	s.Parent = inst
end

local function applyGradient(inst, theme, node)
	if not node.gradient then
		return
	end
	local g = if type(node.gradient) == "string" then theme.gradient[node.gradient] else node.gradient
	if not g then
		return
	end
	local strength = g.strength or theme.gradient.strength
	local base = inst.BackgroundColor3
	local grad = Instance.new("UIGradient")
	grad.Color = ColorSequence.new(
		base:Lerp(Color3.new(1, 1, 1), strength),
		base:Lerp(Color3.new(0, 0, 0), strength * 0.5)
	)
	-- CSS rotation is Roblox rotation + 90; the emitter stores the Roblox value.
	grad.Rotation = g.rotation or 90
	grad.Parent = inst
end

local function applyPadding(inst, theme, node)
	if node.padding == nil then
		return
	end
	local p = Instance.new("UIPadding")
	if type(node.padding) == "table" then
		p.PaddingTop = UDim.new(0, px(theme, node.padding.top))
		p.PaddingRight = UDim.new(0, px(theme, node.padding.right))
		p.PaddingBottom = UDim.new(0, px(theme, node.padding.bottom))
		p.PaddingLeft = UDim.new(0, px(theme, node.padding.left))
	else
		local v = px(theme, node.padding)
		p.PaddingTop, p.PaddingRight = UDim.new(0, v), UDim.new(0, v)
		p.PaddingBottom, p.PaddingLeft = UDim.new(0, v), UDim.new(0, v)
	end
	p.Parent = inst
end

local ALIGN_X = {
	start = Enum.HorizontalAlignment.Left,
	center = Enum.HorizontalAlignment.Center,
	["end"] = Enum.HorizontalAlignment.Right,
}
local ALIGN_Y = {
	start = Enum.VerticalAlignment.Top,
	center = Enum.VerticalAlignment.Center,
	["end"] = Enum.VerticalAlignment.Bottom,
}

local function applyLayout(inst, theme, node)
	if not node.layout then
		return
	end
	local l = node.layout
	local horizontal = l.dir == "horizontal"
	local list = Instance.new("UIListLayout")
	list.FillDirection = if horizontal then Enum.FillDirection.Horizontal else Enum.FillDirection.Vertical
	list.Padding = UDim.new(0, px(theme, l.gap))
	list.SortOrder = Enum.SortOrder.LayoutOrder

	-- justify runs along the fill axis, align across it — same as flexbox.
	if horizontal then
		list.HorizontalAlignment = ALIGN_X[l.justify] or Enum.HorizontalAlignment.Left
		list.VerticalAlignment = ALIGN_Y[l.align] or Enum.VerticalAlignment.Center
	else
		list.VerticalAlignment = ALIGN_Y[l.justify] or Enum.VerticalAlignment.Top
		list.HorizontalAlignment = ALIGN_X[l.align] or Enum.HorizontalAlignment.Center
	end

	if l.justify == "between" then
		list.HorizontalFlex = if horizontal then Enum.UIFlexAlignment.SpaceBetween else list.HorizontalFlex
		list.VerticalFlex = if horizontal then list.VerticalFlex else Enum.UIFlexAlignment.SpaceBetween
	end
	list.Parent = inst
end

local function applyFlex(inst, node)
	if not node.flex then
		return
	end
	local grow, shrink = string.match(node.flex, "^(%S+)%s+(%S+)")
	local item = Instance.new("UIFlexItem")
	if tonumber(grow) and tonumber(grow) > 0 then
		item.FlexMode = Enum.UIFlexMode.Grow
	elseif tonumber(shrink) and tonumber(shrink) > 0 then
		item.FlexMode = Enum.UIFlexMode.Shrink
	else
		item.FlexMode = Enum.UIFlexMode.None
	end
	item.Parent = inst
end

local function applyConstraints(inst, theme, node)
	if node.aspect then
		local a = Instance.new("UIAspectRatioConstraint")
		a.AspectRatio = node.aspect
		a.Parent = inst
	end
	if node.maxSize then
		local c = Instance.new("UISizeConstraint")
		local maxX = if node.maxSize[2] > 0 then node.maxSize[2] else math.huge
		local maxY = if node.maxSize[4] > 0 then node.maxSize[4] else math.huge
		c.MaxSize = Vector2.new(maxX, maxY)
		c.Parent = inst
	end
end

--[[ ---------------------------------------------------------- depth layer ]]

--[[
	Roblox has no box-shadow. Depth is a 9-slice image sibling sitting behind
	the element — the same structure the preview emits as a <div>, so the two
	trees stay isomorphic.

	SHADOW_ASSET must be a real uploaded 9-slice shadow. Left empty deliberately:
	a wrong id renders as a grey block, which is worse than no shadow at all.
]]
local SHADOW_ASSET = ""

local function applyElevation(inst, theme, node)
	local level = node.elevation
	if not level or level == 0 or SHADOW_ASSET == "" then
		return
	end
	local e = theme.elevation[tostring(level)] or theme.elevation[level]
	if not e then
		return
	end
	local shadow = Instance.new("ImageLabel")
	shadow.Name = "ShadowSlice"
	shadow.BackgroundTransparency = 1
	shadow.Image = SHADOW_ASSET
	shadow.ScaleType = Enum.ScaleType.Slice
	shadow.SliceCenter = Rect.new(64, 64, 192, 192)
	shadow.ImageColor3 = Color3.new(0, 0, 0)
	shadow.ImageTransparency = 1 - e.alpha
	shadow.AnchorPoint = Vector2.new(0.5, 0.5)
	shadow.Position = UDim2.new(0.5, 0, 0.5, e.offsetY)
	shadow.Size = UDim2.new(1, e.spread, 1, e.spread)
	shadow.ZIndex = (node.zIndex or 1) - 1
	shadow.Parent = inst.Parent
end

--[[ ------------------------------------------------------ states & motion ]]

local function applyStateProps(inst, theme, props): { [string]: any }
	local goal = {}
	if props.bg then
		goal.BackgroundColor3 = color(theme, props.bg)
	end
	if props.bgTransparency then
		goal.BackgroundTransparency = props.bgTransparency
	end
	-- Parenthesised deliberately: `a and b or c` binds as `(a and b) or c`, which
	-- would take this branch for any TextButton even when props.color is nil.
	if props.color and (inst:IsA("TextLabel") or inst:IsA("TextButton")) then
		goal.TextColor3 = color(theme, props.color)
	end
	if props.rotation then
		goal.Rotation = props.rotation
	end
	return goal
end

--[[
	Hover / pressed feedback. A button with one static appearance reads as broken
	however good it looks.

	`scale` is applied through a UIScale rather than Size, because tweening Size
	on a layout child fights the UIListLayout that owns it.
]]
local function applyStates(inst, theme, node)
	if not node.states or not inst:IsA("GuiButton") then
		return
	end
	local dur = (node.motion and node.motion.duration) or 0.13
	local style = EASING[(node.motion and node.motion.easing) or "quad"] or Enum.EasingStyle.Quad
	local info = TweenInfo.new(dur, style, Enum.EasingDirection.Out)

	local scale = Instance.new("UIScale")
	scale.Name = "StateScale"
	scale.Parent = inst

	local base = {
		BackgroundColor3 = inst.BackgroundColor3,
		BackgroundTransparency = inst.BackgroundTransparency,
		Rotation = inst.Rotation,
	}

	local function to(props)
		if props then
			TweenService:Create(inst, info, applyStateProps(inst, theme, props)):Play()
			TweenService:Create(scale, info, { Scale = props.scale or 1 }):Play()
		else
			TweenService:Create(inst, info, base):Play()
			TweenService:Create(scale, info, { Scale = 1 }):Play()
		end
	end

	inst.MouseEnter:Connect(function()
		to(node.states.hover)
	end)
	-- Wrapped, not passed directly: MouseLeave fires with (x, y), so connecting
	-- `to` would pass a mouse coordinate where a props table is expected.
	inst.MouseLeave:Connect(function()
		to(nil)
	end)
	inst.MouseButton1Down:Connect(function()
		to(node.states.pressed)
	end)
	inst.MouseButton1Up:Connect(function()
		to(node.states.hover)
	end)
end

--[[
	Entrance animation.

	A fade over a subtree needs a CanvasGroup: Roblox has no inherited
	transparency, so fading a container otherwise means tweening every
	descendant individually and desynchronising them.
]]
function UIBuilder.playEntrance(inst: GuiObject, node)
	local motion = node.motion
	if not motion or not motion.enter then
		return
	end
	local dur = motion.duration or 0.3
	local style = EASING[motion.easing or "quad"] or Enum.EasingStyle.Quad
	local info = TweenInfo.new(dur, style, Enum.EasingDirection.Out, 0, false, motion.delay or 0)

	local scale = inst:FindFirstChild("EnterScale") or Instance.new("UIScale")
	scale.Name = "EnterScale"
	scale.Parent = inst

	if motion.enter == "pop" then
		scale.Scale = 0.8
	elseif motion.enter == "fade-scale" then
		scale.Scale = 0.92
	end

	if inst:IsA("CanvasGroup") then
		inst.GroupTransparency = 1
		TweenService:Create(inst, info, { GroupTransparency = 0 }):Play()
	end
	if motion.enter == "slide-up" then
		local final = inst.Position
		inst.Position = final + UDim2.fromOffset(0, 16)
		TweenService:Create(inst, info, { Position = final }):Play()
	end
	TweenService:Create(scale, info, { Scale = 1 }):Play()
end

--[[ --------------------------------------------------------------- build ]]

local CLASS_DEFAULTS = {
	TextLabel = { BackgroundTransparency = 1 },
	TextButton = { AutoButtonColor = false, Text = "" },
	TextBox = { ClearTextOnFocus = false },
	ImageLabel = { BackgroundTransparency = 1 },
	ImageButton = { BackgroundTransparency = 1, AutoButtonColor = false },
}

local ALIGN_TEXT_X = {
	start = Enum.TextXAlignment.Left,
	center = Enum.TextXAlignment.Center,
	["end"] = Enum.TextXAlignment.Right,
}

local function buildNode(node, theme, vpClass, parent): GuiObject
	-- Responsive overrides, merged exactly as the transpiler merges them.
	if node.at and node.at[vpClass] then
		local merged = table.clone(node)
		for k, v in node.at[vpClass] do
			merged[k] = v
		end
		merged.at = nil
		node = merged
	end

	local class = node.class or "Frame"
	-- A subtree fade needs a CanvasGroup; Roblox has no inherited transparency.
	if node.motion and node.motion.enter and node.children and #node.children > 0 then
		class = "CanvasGroup"
	end

	local inst = Instance.new(class) :: any
	inst.Name = node.name or class
	for prop, value in CLASS_DEFAULTS[class] or {} do
		inst[prop] = value
	end

	inst.Size = udim2(node.size)
	inst.Position = udim2(node.pos)
	if node.anchor then
		inst.AnchorPoint = Vector2.new(node.anchor[1], node.anchor[2])
	end
	if node.rotation then
		inst.Rotation = node.rotation
	end
	if node.zIndex then
		inst.ZIndex = node.zIndex
	end
	if node.clip then
		inst.ClipsDescendants = true
	end
	-- X was missing here while the spec vocabulary already accepted `auto: 'x'`, so a
	-- node asking to size to its own width silently got none and collapsed in-engine.
	-- The HTML preview had the identical hole, which hid it: both were wrong the same
	-- way, so the render loop reported "clean" on broken output. Keep all three arms
	-- in step — `ui-forge/test/patterns.test.mjs` asserts that they are.
	if node.auto == "x" then
		inst.AutomaticSize = Enum.AutomaticSize.X
	elseif node.auto == "y" then
		inst.AutomaticSize = Enum.AutomaticSize.Y
	elseif node.auto == "xy" then
		inst.AutomaticSize = Enum.AutomaticSize.XY
	end

	if node.bg then
		inst.BackgroundColor3 = color(theme, node.bg)
		inst.BackgroundTransparency = node.bgTransparency or 0
	elseif CLASS_DEFAULTS[class] == nil then
		inst.BackgroundTransparency = 1
	end

	-- Text
	--
	-- `placeholder` is overloaded and that is what broke here. On a TextBox it is the
	-- placeholder string; on an ImageLabel or ImageButton it names an asset that does not
	-- exist yet, handled further down by painting the node magenta.
	--
	-- Gating this branch on the *field* meant an ImageLabel carrying `placeholder = "relic"`
	-- fell in and hit `inst.Text = ...`, which threw. That error propagated out of
	-- `UIBuilder.build`, killed the client entry point on its second statement, and took the
	-- HUD and every keybind with it — the whole client, from one icon with no asset.
	--
	-- So gate on what the Instance can actually hold. A node may carry any field; only some
	-- of them apply to the class it asked for.
	local holdsText = inst:IsA("TextLabel") or inst:IsA("TextButton") or inst:IsA("TextBox")
	if holdsText and (node.text ~= nil or node.placeholder ~= nil) then
		local t = theme.type[node.type or "body"]
		if inst:IsA("TextBox") then
			inst.PlaceholderText = node.placeholder or ""
			inst.Text = node.text or ""
			inst.PlaceholderColor3 = color(theme, "content.muted")
		else
			inst.Text = node.text or ""
		end
		if t then
			inst.Font = (Enum.Font :: any)[t.font] or Enum.Font.Gotham
			inst.TextSize = t.size
		end
		inst.TextColor3 = color(theme, node.color or "content.primary")
		inst.TextTransparency = node.textTransparency or 0
		inst.TextXAlignment = ALIGN_TEXT_X[node.align] or Enum.TextXAlignment.Center
		inst.TextWrapped = node.wrap == true
		if node.textStroke then
			local ts = Instance.new("UIStroke")
			ts.Color = color(theme, node.textStroke.color)
			ts.Thickness = px(theme, node.textStroke.thickness)
			ts.Parent = inst
		end
	end

	-- Image
	if node.image then
		inst.Image = node.image
		if node.slice then
			inst.ScaleType = Enum.ScaleType.Slice
			local i = node.slice.inset
			-- CSS border-image insets are edge widths; SliceCenter is a rect in
			-- source-image coordinates, so the far edges need the image size.
			local w, h = node.slice.imageSize and node.slice.imageSize[1] or 256,
				node.slice.imageSize and node.slice.imageSize[2] or 256
			inst.SliceCenter = Rect.new(i[4], i[1], w - i[2], h - i[3])
		else
			inst.ScaleType = if node.imageFit == "crop" then Enum.ScaleType.Crop else Enum.ScaleType.Fit
		end
		if node.imageTint then
			inst.ImageColor3 = color(theme, node.imageTint)
		end
	elseif node.placeholder and (class == "ImageLabel" or class == "ImageButton") then
		-- Loud on purpose: a missing asset should be impossible to ship past.
		inst.BackgroundColor3 = Color3.fromRGB(255, 0, 200)
		inst.BackgroundTransparency = 0.5
	end

	if node.scroll and inst:IsA("ScrollingFrame") then
		inst.ScrollBarThickness = 6
		inst.AutomaticCanvasSize = Enum.AutomaticSize.Y
		inst.CanvasSize = UDim2.new()
		inst.ScrollingDirection = Enum.ScrollingDirection.Y
		inst.BorderSizePixel = 0
	end

	if inst:IsA("GuiObject") then
		inst.BorderSizePixel = 0
	end

	applyCorner(inst, theme, node)
	applyStroke(inst, theme, node)
	applyGradient(inst, theme, node)
	applyPadding(inst, theme, node)
	applyLayout(inst, theme, node)
	applyFlex(inst, node)
	applyConstraints(inst, theme, node)

	inst.Parent = parent
	applyElevation(inst, theme, node)
	applyStates(inst, theme, node)

	for i, child in node.children or {} do
		local c = buildNode(child, theme, vpClass, inst)
		c.LayoutOrder = i
	end

	UIBuilder.playEntrance(inst, node)
	return inst
end

--[[
	@param screen  a Screens/*.luau table
	@param theme   the Theme.luau table
	@param parent  usually a ScreenGui
]]
function UIBuilder.build(screen, theme, parent: Instance): GuiObject
	return buildNode(screen.root, theme, viewportClass(), parent)
end

UIBuilder.viewportClass = viewportClass
UIBuilder.resolveToken = resolveToken

return UIBuilder
