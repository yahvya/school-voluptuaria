# vars
BUNDLE_FILE=./specification-bundle/bundle.json
SPECIFICATION_BASE_FILE=./specification-redaction/specifications.json
SPECIFICATION_HTML_PATH=../specification/html
SPECIFICATION_POSTMAN_PATH=../specification/postman

# install the required elements
install:
	npm install -g swagger-cli
	npm install @openapitools/openapi-generator-cli -g

# bundle specifications
bundle:
	swagger-cli bundle --outfile $(BUNDLE_FILE) --type json --format 4 --dereference $(SPECIFICATION_BASE_FILE)

# generate the specification document
generate-spec:
	openapi-generator-cli generate -i $(BUNDLE_FILE) -g html --skip-validate-spec -o $(SPECIFICATION_HTML_PATH)
	openapi-generator-cli generate -i $(BUNDLE_FILE) -g postman-collection --skip-validate-spec -o $(SPECIFICATION_POSTMAN_PATH)
	rm ./openapitools.json

all: install bundle generate-spec