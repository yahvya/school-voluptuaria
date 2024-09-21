# merge a branch with main
define merge_with_main
	git switch $(1)
	git merge main
	git push
endef

# synchronise all branches
sync:
	git pull --all
	git switch main || 1
	git merge api
	git merge database
	git merge documentation
	git merge front-end
	git merge shared-documents
	git merge tests
	git push
	@$(call merge_with_main , "api")
	@$(call merge_with_main , "database")
	@$(call merge_with_main , "documentation")
	@$(call merge_with_main , "front-end")
	@$(call merge_with_main , "shared-documents")
	@$(call merge_with_main , "tests")
	git switch main