branch=$(git symbolic-ref --short HEAD)
root=$(git rev-parse --show-toplevel)
cwd=$(pwd)

cd "$root"
git checkout gh-pages
git merge master
git subtree push --prefix client origin gh-pages
git checkout "$branch"
cd "$cwd"
