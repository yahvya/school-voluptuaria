# vars
SOURCE_DIR=./schemas-definition
DESTINATION_DIR=./schemas-as-documents

#intall the tool to convert schemas to documents
install:
	npm install -g @adobe/jsonschema2md

# convert schemas into documents
convert:
	jsonschema2md -n -h false -s -d $(SOURCE_DIR) -o $(DESTINATION_DIR)

# open the database schema documentations
open:
	@echo Ouvrez les fichiers suivants :
	@echo 	- $(DESTINATION_DIR)/user.md
	@echo 	- $(DESTINATION_DIR)/place.md