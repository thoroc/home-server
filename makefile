.DEFAULT_GOAL:=help

INTERACTIVE:=$(shell [ -t 0 ] && echo 1)

ROOT_DIR:=$(CURDIR)
OPT_DIR:=${ROOT_DIR}/opt

# Include all module .fn.mk files
include $(wildcard ${OPT_DIR}/make/*.fn.mk)
include $(wildcard ${OPT_DIR}/make/*.mk)

.PHONY: help
help: ## Generate list of targets with descriptions
	@awk -F ':|##' '/^[^\t].+:.*\#\#/ {printf "$(STYLE_cyan_bold)%-30s$(STYLE_reset) %s\n", $$1, $$NF }' $(MAKEFILE_LIST) | sort

.PHONY: list
list: ## cmd line completion for 'make(space)(tab)'
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs

.PHONY: start
start: ## run all the containers in detached mode
	@docker-compose up -d

.PHONY: start_%
start_%: ## run the declared container
	@docker-compose up -d $*

.PHONY: stop
stop: ## take all the containers down
	@docker-compose down -v --remove-orphans

.PHONY: portainer
portainer: ## run portainer as stand alone container
	@docker-compose up -d portainer
	@echo "portainer started on http://localhost:"`docker-compose port portainer 9000 | cut -f 2 -d :`	


