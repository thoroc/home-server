STYLE__COLOR_red=31
STYLE__COLOR_green=32
STYLE__COLOR_yellow=33
STYLE__COLOR_blue=34
STYLE__COLOR_purple=35
STYLE__COLOR_cyan=36
STYLE__COLOR_lightgray=37
STYLE__COLOR_lightblue=94

STYLE_reset:=\033[0m

STYLE__ALL_COLORS=green \
	yellow \
	blue \
	purple \
	cyan \
	lightgray \
	lightblue

STYLE_normal=00
STYLE_bold=01
STYLE_faint=02
STYLE_italic=03
STYLE_underline=04

STYLE__ALL_STYLES=normal \
	bold \
	faint \
	italic \
	underline

# Some magic to declare `STYLE_color_style` variants programatically
__:=$(foreach color,$(STYLE__ALL_COLORS), \
			$(foreach style,$(STYLE__ALL_STYLES), \
				$(eval STYLE_$(color)_$(style)=\033[$(STYLE_$(style));$(STYLE__COLOR_$(color))m) \
				ifeq ($(style),normal) \
					$(eval STYLE_$(color)=\033[$(STYLE_$(style));$(STYLE__COLOR_$(color))m) \
				endif \
			;) \
		;)


STYLE_success=$(STYLE_green_normal)
STYLE_info=$(STYLE_yellow_normal)
STYLE_error=$(STYLE_red_normal)

define style #(text,color,style)
	@if [ -z "$(3)" ]; then \
		echo "$(STYLE_$(2)_normal)$(1)$(STYLE_reset)"; \
	else \
		echo "$(STYLE_$(2)_$(3))$(1)$(STYLE_reset)"; \
	fi
endef

define style_error #(text,style)
$(call style,$(1),red,$(2))
endef

define style_warn #(text,style)
$(call style,$(1),yellow,$(2))
endef

define style_success #(text,style)
$(call style,$(1),green,$(2))
endef