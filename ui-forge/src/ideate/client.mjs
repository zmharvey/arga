/**
 * The LLM client moved to shared/llm/client.mjs when stage 0 (concept) needed
 * the same strict-schema guarantees. Re-exported here so every existing import
 * inside ui-forge keeps working.
 */
export * from '../../../shared/llm/client.mjs';
