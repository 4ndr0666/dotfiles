import sys
import os

def expand_user_path(path):
    """Expands user and environment variables in given path."""
    return os.path.expanduser(os.path.expandvars(path))

def contains_executables(directory):
    """Check if the directory contains executable files."""
    return any(os.access(os.path.join(directory, f), os.X_OK) for f in os.listdir(directory))

def add_subdirectories_to_path(base_dir):
    """Add all subdirectories of a base directory to PATH if they contain executables."""
    subdirectories = [os.path.join(base_dir, d) for d in os.listdir(base_dir)
                      if os.path.isdir(os.path.join(base_dir, d)) and contains_executables(os.path.join(base_dir, d))]
    return subdirectories

def auto_discover_paths():
    """Automatically discovers common paths that should be added to PATH."""
    common_paths = [
        expand_user_path('~/.npm-global/bin'),
        expand_user_path('~/.cargo/bin'),
        expand_user_path('~/.gem/ruby/2.7.0/bin'),  # Adjust Ruby version as needed
        expand_user_path('~/.pyenv/bin'),
        expand_user_path('~/.pyenv/shims'),
        expand_user_path('~/.local/share/solana/install/active_release/bin'),
        expand_user_path('~/.ghcup/bin'),
        expand_user_path('~/.config/yarn/global/node_modules/.bin'),
        '/usr/local/go/bin',
        '/usr/lib/jvm/default/bin',  # Consider using JAVA_HOME if set
        expand_user_path('~/.sdkman/candidates/java/current/bin'),
        expand_user_path('~/.rvm/bin'),
        expand_user_path('~/.virtualenvs'),
        expand_user_path('~/.poetry/bin'),
        '/opt/cuda/bin',
        expand_user_path('~/bin'),
        expand_user_path('~/.local/bin'),
        '/snap/bin',
        '/opt/bin',
        '/sbin',
        '/usr/sbin',
    ]
    # Filter out paths that do not exist or do not contain executables
    discovered_paths = [path for path in common_paths if os.path.isdir(path) and contains_executables(path)]
    return discovered_paths

def process_user_input():
    """Prompt the user to input additional paths or paths to remove."""
    print("Enter paths to include (comma-separated) or to remove (preceded by '-'): ")
    user_input = input().split(',')
    add_paths = [path.strip() for path in user_input if path and not path.startswith('-')]
    remove_paths = [path.strip()[1:] for path in user_input if path.startswith('-')]
    return add_paths, remove_paths

def clean_and_manage_path(base_paths=[], add_paths=[], remove_paths=[]):
    """Clean and manage PATH by adding and removing specified paths."""
    all_paths = set(os.environ.get('PATH', '').split(os.pathsep) + base_paths + add_paths)
    # Remove specified paths and non-existent or non-executable directories
    final_paths = {path for path in all_paths if path not in remove_paths and os.path.isdir(path) and contains_executables(path)}
    os.environ['PATH'] = os.pathsep.join(final_paths)
    return os.environ['PATH']

if __name__ == "__main__":
    base_paths = ['/usr/local/bin', expand_user_path('~/.local/bin')]  # Example base paths
    auto_paths = auto_discover_paths()

    if '--prompt' in sys.argv:
        user_add_paths, user_remove_paths = process_user_input()
    else:
        user_add_paths, user_remove_paths = [], []

    new_path = clean_and_manage_path(auto_paths, user_add_paths, user_remove_paths)
#    print(f"Updated PATH: {new_path}")

    with open('/tmp/updated_path.txt', 'w') as file:
        file.write(f"export PATH={new_path}\n")
