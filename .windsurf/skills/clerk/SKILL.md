---
name: clerk
description: A brief description, shown to the model to help it understand when to use this skill
---

Instructions for the skill go here. Provide relative paths to other resources in the skill directory as needed.

import { getAuth } from "@hono/clerk-auth";
const auth = await getAuth(c)
const user = auth.user
