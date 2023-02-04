build :
	git checkout master && npx webpack && cd static && bundle exec jekyll build -d ../_site && cd ..

serve:
	cd static && jekyll s

deploy : build
	git checkout site && \
	rsync -a _site/ docs/ && \
	git add docs && \
	git commit -m 'update' && \
	git push && \
	git checkout master

deploy-server :
	git push heroku master

install :
	npm install &
	bundle install
