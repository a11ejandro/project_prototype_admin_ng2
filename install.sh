#!/bin/bash

# 1. Retrieve variables
echo -n "What will be the package name of a project?"
read PACKAGE_NAME

echo -n "What is the full name of a project?"
read PROJECT_NAME

# 2. Rename project directory
cd ..
mv project_prototype_admin_ng2 "$PACKAGE_NAME"
cd "$PACKAGE_NAME"

# 3. Replace project-dependant information with new variables
FILES=("package.json" "index.html" "app/authorised.component.html")

for f in "${FILES[@]}"
do
  if [ -f $f -a -r $f ]; then
   sed -i "s/Project_Prototype/$PROJECT_NAME/g" "$f"
   sed -i "s/project_prototype_ng2/$PACKAGE_NAME/g" "$f"
  else
   echo "Error: Cannot read $f"
  fi
done

# 4. Install packages.
npm install

# 5. Reset git repo.
rm -rf .git
git init
git add --all
git commit -m 'Initial commit - project initialized from project_prototype_ng2'
echo "Now you can add git remotes"
