# playwright-test

Will try out Playwright with github actions integration

## Used CLI commands:

```
pnpm create playwright
```

## Usefull scripts

pnpm exec playwright test
Runs the end-to-end tests.

pnpm exec playwright test --ui
Starts the interactive UI mode.

pnpm exec playwright test --project=chromium
Runs the tests only on Desktop Chrome.

pnpm exec playwright test example
Runs the tests in a specific file.

pnpm exec playwright test --debug
Runs the tests in debug mode.

pnpm exec playwright codegen
Auto generate tests with Codegen.

pnpm exec playwright show-report
To open last HTML report run

# QA autotests generation (based on user recording)

1. Capture user session (human)
2. Normalize into structured actions (click, input, navigation) if we don't want to work with recording source code. (token economy?)
3. Use AI to: remove test noise , group actions into meningfull steps, suggest assertions (use Playwright MCP)
4. Convert data into structured test model
5. Generate Playwright code from that model
6. Commit in branch and run test
7. Create PR for human if passed

# QA new autotests generation (based on commit to UI code, or new functionality, can be manual with prompt input maybe)

1. Context gather. Pick commit details of app under test and prompt(optional, if manual run)
2. Normalize into structured actions (click, input, navigation) if we don't want to work with recording source code. (token economy?)
3. Use AI to: generate new test steps, with assertions (use Playwright MCP)
4. Convert data into structured test model
5. Generate Playwright code from that model
6. Commit in branch and run test
7. Create PR for human if passed

# QA automation agent to self-heal flaky tests from github repo.

1. Signaling (failed test job in github action, manual trigger from github action to start a session)
2. Failure classification (preferably deterministic, not ai, json format).
   2.1 selector not found -> UI change
   2.2 timeout -> async issue
   2.3 assertion failed -> bug or behaviour change (should be avoided in healing process further)
3. Healing strategy (also deterministic)
   3.1. selector healing (alternative selectors, semantic attributes: data-testid, roles)
   3.2 timing issues (adgust waits, rely on Playwright auto-waiting)
4. AI assisted healing fallback (if needed, playwright mcp?)
   4.1 analyse failure + DOM + previous version
   4.2 suggest minimal patch: (selector fix, step adjustment)
   Constraints: structured output (JSON diff, maybe not raw code but unsure), cannot remove assertions, must preserve intent
   5 Validation (deterministic, no AI)
   5.1 rerun tests
   5.2 compare with baseline
   5.3 check stability
5. Merge decision or PR with review
   6.1 AI can summarize change, suggest confidence
   6.2 deterministic auto-merge low-risk fixes
   6.3 human review for risky ones
   7 Feedback loop (AI but optional)
   7.1 cluster failure patterns
   7.2 suggest improvements
