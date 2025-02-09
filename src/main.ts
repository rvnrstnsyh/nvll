/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import '$std/dotenv/load.ts'

import manifest from '../src/fresh.gen.ts'
import config from '../src/fresh.config.ts'

import { start } from '$fresh/server.ts'

await start(manifest, config)
