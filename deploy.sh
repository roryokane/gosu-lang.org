SOURCE=build/www/
TARGET_LOCAL=/mnt/sdb2/home/bchang/gosu-lang
TARGET_INTERNAL=root@opensource-internal:/var/www/html/gosu
TARGET_EXTERNAL=bchang@gosu-lang.org:/var/www/html

DRY_RUN="--dry-run"

while [ -n "$1" ]; do
  if [ "$1" == "-y" ]; then
    DRY_RUN=""
  elif [ "$1" == "-local" ]; then
    TARGET=$TARGET_LOCAL
  elif [ "$1" == "-internal" ]; then
    TARGET=$TARGET_INTERNAL
  elif [ "$1" == "-external" ]; then
    TARGET=$TARGET_EXTERNAL
  fi
  shift
done

if [ -z "$TARGET" ]; then
  echo "specify -local, -internal, or -external"
  exit 1
fi

command="rsync --recursive --checksum --perms --verbose --delete --rsh=ssh --exclude-from=rsync-exclude $DRY_RUN $SOURCE $TARGET"
echo $command
$command
