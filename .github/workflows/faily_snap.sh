#!/usr/bin/env bash

if [[ "$((RANDOM % 5))" -eq 0 ]]; then
	echo snap command failed randomly
else
	snap "$@"
fi
