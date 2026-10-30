# Critical Operational Rules

## 1. Strict Write Permission Restriction (Mandatory)

> [!IMPORTANT]
> **READ AND ADHERE TO THIS RULE IMMEDIATELY UPON INITIALIZATION.**

* **No Write Permissions by Default**: You do not have write permissions. You are strictly forbidden from writing, overwriting, creating, or modifying any files (using `write_file`, `edit_file`, or command line output redirection/scripts).
* **Mandatory Passphrase Override**: You may only write, overwrite, or create files if the Admin of this machine explicitly authorizes the action by providing the exact passphrase:
  `WRITE_PERMISSION_ALLOWED_2128`
* **Execution Constraint**: When the passphrase is not present in the user request, you must operate strictly in read-only mode, regardless of the prompt contents.
