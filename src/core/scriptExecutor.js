/**
 * Core script execution functionality
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const BRIDGE_URL = 'http://127.0.0.1:3000';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ScriptExecutor {
    /**
     * Execute AppleScript command
     * @param {string} script - The AppleScript to execute
     * @returns {string} The result of the AppleScript execution
     */
    static async executeAppleScript(script) {
        try {
            const result = execSync(`osascript -e '${script}'`, { encoding: 'utf8' });
            return result.trim();
        } catch (error) {
            throw new Error(`AppleScript execution failed: ${error.message}`);
        }
    }

    /**
     * Execute InDesign script via AppleScript
     * @param {string} script - The ExtendScript to execute
     * @returns {string} The result of the script execution
     */
    /**
     * Execute JS code inside InDesign via the UXP bridge
     * @param {string} code - JS code with `app` in scope (UXP InDesign API)
     * @returns {any} The serialized result
     */
    static async executeViaUXP(code) {
        const response = await fetch(`${BRIDGE_URL}/execute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Bridge error: ${response.status}`);
        }

        return data.result;
    }

    /**
     * Check if the UXP bridge is running and plugin is connected
     * @returns {boolean}
     */
    static async isUXPAvailable() {
        try {
            const response = await fetch(`${BRIDGE_URL}/status`, { signal: AbortSignal.timeout(1000) });
            const data = await response.json();
            return data.connected === true;
        } catch {
            return false;
        }
    }

    static async executeInDesignScript(script) {
        try {
            // Write script to temporary file
            const tempScriptPath = path.join(__dirname, '../../temp_script.jsx');
            fs.writeFileSync(tempScriptPath, script);

            // Execute via AppleScript with persistent session
            const appleScript = `
        tell application "Adobe InDesign 2026"
          activate
          do script POSIX file "${tempScriptPath}" language javascript
        end tell
      `;

            const result = await this.executeAppleScript(appleScript);

            // Clean up temporary file
            try {
                fs.unlinkSync(tempScriptPath);
            } catch (cleanupError) {
                // Ignore cleanup errors
            }

            return result;
        } catch (error) {
            throw new Error(`Error executing tool: ${error.message}`);
        }
    }
} 