Git Branch Workflow Guide:

# Create Your Personal Branch
git checkout -b your-branch-name

# IT IS VERY IMPORTANT: to keep your branch updated.
# Before adding anything to code do:

# Step 1 —  (if not already in amin)
git checkout main
git pull

# Step 2 — Switch back to your branch:
git checkout your-branch-name

# Step 3 — Merge main into your branch:
git merge main

# If there are no conflicts → great!
# If there are conflicts → fix them now or ask friends (much easier than later).







