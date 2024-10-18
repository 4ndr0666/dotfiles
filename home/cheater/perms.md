## CHMOD Permission Reference

### Understanding CHMOD Numbers

CHMOD uses a three-digit octal number to set permissions:

- **First digit**: Owner permissions
- **Second digit**: Group permissions
- **Third digit**: Others (world) permissions

Each digit is a sum of its component permissions:

- **4**: Read (`r`)
- **2**: Write (`w`)
- **1**: Execute (`x`)
- **0**: No permission

For example, `7` (4+2+1) grants read, write, and execute permissions.

---

### Common Permission Settings

| **CHMOD** | **Symbolic** | **Owner** | **Group** | **Others** | **Description** | **Common Use Cases** |
|-----------|--------------|-----------|-----------|------------|------------------|----------------------|
| **400**   | `r--------`  | Read      | -         | -          | Read-only for owner | Sensitive configuration files |
| **600**   | `rw-------`  | Read, Write | -       | -          | Read and write for owner | Private files (e.g., `~/.ssh/id_rsa`) |
| **644**   | `rw-r--r--`  | Read, Write | Read    | Read       | Owner can read/write; others can read | General configuration files (e.g., `/etc/passwd`) |
| **700**   | `rwx------`  | Read, Write, Execute | - | -          | Full permissions for owner | Executable scripts, personal directories (`~/bin`) |
| **755**   | `rwxr-xr-x`  | Read, Write, Execute | Read, Execute | Read, Execute | Owner full; others read and execute | System binaries (`/usr/bin`), shared directories |
| **775**   | `rwxrwxr-x`  | Read, Write, Execute | Read, Write, Execute | Read, Execute | Owner and group full; others read and execute | Collaborative directories (`/var/www`) |
| **777**   | `rwxrwxrwx`  | Read, Write, Execute | Read, Write, Execute | Read, Write, Execute | All users have full permissions | **Use with caution** (temporary permissions) |
| **440**   | `r--r--r--`  | Read      | Read      | -          | Read-only for owner and group | Shared read-only files |
| **550**   | `r-xr-x---`  | Read, Execute | Read, Execute | -          | Read and execute for owner and group | Shared executables |
| **750**   | `rwxr-x---`  | Read, Write, Execute | Read, Execute | -          | Full for owner; read and execute for group | Restricted shared directories |
| **664**   | `rw-rw-r--`  | Read, Write | Read, Write | Read       | Read and write for owner and group; read for others | Collaborative files |

---

### Default Permissions for Common System Files and Directories

| **File/Directory**     | **Owner** | **Group** | **Others** | **CHMOD** | **Description** |
|------------------------|-----------|-----------|------------|-----------|-----------------|
| **/etc/sudoers**       | root      | root      | -          | `440`     | Configuration for sudo privileges |
| **/etc/passwd**        | root      | root      | `644`      | `644`     | User account information |
| **/etc/shadow**        | root      | shadow     | `000`      | `640`     | Secure user password information |
| **/etc/ssh/ssh_config**| root      | root      | `644`      | `644`     | SSH client configuration |
| **~/.ssh/id_rsa**      | user      | user      | `600`      | `600`     | Private SSH key |
| **~/.ssh/id_rsa.pub**  | user      | user      | `644`      | `644`     | Public SSH key |
| **~/.gnupg/**          | user      | user      | `700`      | `700`     | GnuPG configuration and keys |
| **/usr/bin/**          | root      | root      | `755`      | `755`     | Executable binaries |
| **/var/www/**          | root      | www-data  | `775`      | `775`     | Web server files |

---

### Special Permission Bits

In addition to the basic permissions, there are special bits that can modify how permissions are handled:

- **Setuid (`4xxx`)**: Executes a file with the file owner's permissions.
- **Setgid (`2xxx`)**: Executes a file with the group's permissions; new files inherit the group ID.
- **Sticky Bit (`1xxx`)**: Only the file owner or root can delete or modify files within the directory.

**Example:**

- **4755**: Setuid + `rwxr-xr-x`
- **2775**: Setgid + `rwxrwxr-x`
- **1755**: Sticky Bit + `rwxr-xr-x`

**Use Cases:**

- **Setuid**: Programs like `passwd` that require elevated privileges.
- **Setgid**: Shared directories where group collaboration is essential.
- **Sticky Bit**: `/tmp` directory to prevent users from deleting each other's files.
