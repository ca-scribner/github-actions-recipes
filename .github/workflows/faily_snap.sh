#!/usr/bin/env bash

if [[ "$((RANDOM % 2))" -eq 0 ]]; then
	snap "$@"
else
	echo snap command failed randomly
fi
