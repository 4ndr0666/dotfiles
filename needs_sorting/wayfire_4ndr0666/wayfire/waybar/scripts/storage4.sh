#!/bin/sh

# Constants
MOUNT="/storage"
WARNING_THRESHOLD=20
CRITICAL_THRESHOLD=10

# Initialize variables
class=""

# Error handling for mount point not existing
if [ ! -d "$MOUNT" ]; then
  echo "Error: Directory $MOUNT does not exist."
  exit 1
fi

# Get disk space usage details
df -h -P -l "$MOUNT" | awk -v warning=$WARNING_THRESHOLD -v critical=$CRITICAL_THRESHOLD '
/\/.*/ {
  text=$4
  tooltip="Filesystem: "$1"\rSize: "$2"\rUsed: "$3"\rAvail: "$4"\rUse%: "$5"\rMounted on: "$6
  use=$5
  exit 0
}
END {
  gsub(/%$/,"",use)
  # Check disk space usage against thresholds
  if ((100 - use) < critical) {
    class="critical"
  } else if ((100 - use) < warning) {
    class="warning"
  }
  # Output details in JSON format
  print "{\"text\":\""text"\", \"percentage\":"use",\"tooltip\":\""tooltip"\", \"class\":\""class"\"}"
}
'
