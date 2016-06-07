#!/bin/bash

while IFS='' read -r line || [[ -n "$line" ]]; do
    key=$( echo $line | grep -oP '(?<={{)[^}}]*' )
    replaced=$( echo $line | sed "s%{{[A-Z0-9_]*}}%${!key}%g" )
    echo "$replaced" >> "$2"
done < "$1"