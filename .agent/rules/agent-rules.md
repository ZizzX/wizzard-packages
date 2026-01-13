---
trigger: manual
---

# Agent Operational Rules

1.  **NO Git Actions**: Do not execute `git add`, `git commit`, `git push`, or any other git modifying commands. The user handles version control.
2.  **Command Proposal**: Instead of running execution commands, provide the exact command string in the chat for the user to copy-paste.
    - Specify the Working Directory (CWD).
    - Wait for user confirmation before proceeding with dependent steps.
3.  **Allowed Actions**:
    - Editing code (`replace_file_content`, `write_to_file`, etc.).
    - Reading files and directories (`list_dir`, `view_file`, etc.).
    - Passive info gathering is permitted, but avoid shell commands where possible.
4. Всегда сам выполняй все задачи с bd!
5. Всегда отвечай на русском для меня, все что пишешь в коде и проекте пиши на английском!
6. always use MCP context7!
