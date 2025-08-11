#!/bin/bash
cd /home/kavia/workspace/code-generation/event-ticketing-platform-121457/event_ticketing_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

