#!/usr/bin/env bash
X="$RANDOM"
echo Random number: $X
if [[ "$((X % 5))" -eq 0 ]]; then
	echo snap command failed randomly
else
	snap "$@"
fi
