import { Box, Text, useInput } from "ink";
import React from "react";

/**
 * An overlay that lists the available slash‑commands and their description.
 * The overlay is purely informational and can be dismissed with the Escape
 * key. Keeping the implementation extremely small avoids adding any new
 * dependencies or complex state handling.
 */
export default function HelpOverlay({
  onExit,
}: {
  onExit: () => void;
}): JSX.Element {
  useInput((input, key) => {
    if (key.escape || input === "q") {
      onExit();
    }
  });

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor="gray"
      width={80}
    >
      <Box paddingX={1}>
        <Text bold>Available commands</Text>
      </Box>

      <Box flexDirection="column" paddingX={1} paddingTop={1}>
        <Text bold dimColor>
          Slash‑commands
        </Text>
        <Text>
          <Text color="cyan">/help</Text> – show this help overlay
        </Text>
        <Text>
          <Text color="cyan">/model</Text> – switch the LLM model in‑session
        </Text>
        <Text>
          <Text color="cyan">/approval</Text> – switch auto‑approval mode
        </Text>
        <Text>
          <Text color="cyan">/history</Text> – show command &amp; file history
          for this session
        </Text>
        <Text>
          <Text color="cyan">/clear</Text> – clear screen &amp; context
        </Text>

        <Box marginTop={1}>
          <Text bold dimColor>
            Keyboard shortcuts
          </Text>
        </Box>
        <Text>
          <Text color="yellow">Enter</Text> – send message
        </Text>
        <Text>
          <Text color="yellow">Ctrl+J</Text> – insert newline
        </Text>
        {/* Re-enable once we re-enable new input */}
      </Box>

      <Box paddingX={1} marginTop={1}>
        <Text bold color="cyan">Writing Assistant Commands</Text>
      </Box>
      <Box paddingX={1}>
        <Text>/outline &mdash; Outline your idea or text</Text>
      </Box>
      <Box paddingX={1}>
        <Text>/summarize &mdash; Summarize the provided text</Text>
      </Box>
      <Box paddingX={1}>
        <Text>/rewrite &mdash; Rewrite text in a different style or tone</Text>
      </Box>
      <Box paddingX={1}>
        <Text>/brainstorm &mdash; Generate ideas for a topic</Text>
      </Box>
      <Box paddingX={1}>
        <Text dimColor>esc or q to close</Text>
      </Box>
    </Box>
  );
}
