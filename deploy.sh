SOURCE=build/www/
TARGET_LOCAL=/mnt/sdb2/home/bchang/gosu-lang
TARGET_INTERNAL=root@opensource-internal:/var/www/html/gosu
TARGET=$TARGET_LOCAL

rsync --recursive --checksum --perms --verbose --delete --rsh=ssh --exclude-from=rsync-exclude --dry-run $SOURCE $TARGET
