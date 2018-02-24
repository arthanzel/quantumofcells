branch=$(git symbolic-ref --short HEAD)
root=$(git rev-parse --show-toplevel)
cwd=$(pwd)

cd "$root/client"
git checkout gh-pages
git merge master
NODE_ENV=production npm run build
git add .
git commit -m "Deployment $(date)"
cd ..
git subtree push --prefix client origin gh-pages
git checkout "$branch"
cd "$cwd"
