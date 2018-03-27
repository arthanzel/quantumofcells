if [[ -z "$1" ]]; then
    echo "Usage: ./versionup.sh {major|minor|patch}"
fi

cd client
npm version "$1"
cd ../server
npm version "$1"
cd ..
VERSION=$(node -e "console.log(require('./client/package.json').version)")
git add client/package.json client/package-lock.json server/package.json server/package-lock.json
git commit -m "Version bump to $VERSION"