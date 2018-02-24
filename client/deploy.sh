branch=$(git symbolic-ref --short HEAD)
root=$(git rev-parse --show-toplevel)
cwd=$(pwd)

cd "$root/client"
git checkout gh-pages
git merge master
npm run build
cd ..
git subtree push --prefix client origin gh-pages
git checkout "$branch"
cd "$cwd"
