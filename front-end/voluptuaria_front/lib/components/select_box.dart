import 'package:flutter/material.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';

class SelectBox extends StatefulWidget {
  final Color backgroundColor;
  final String placeholder;
  final List<String> items;
  final Function(String)? onChanged;
  final double fontSize;
  final Color textColor;
  final Color arrowColor;

  const SelectBox({
    super.key,
    this.backgroundColor = upperBackgroundColor,
    required this.placeholder,
    required this.items,
    this.onChanged,
    this.fontSize = 20,
    this.textColor = primaryText,
    this.arrowColor = buttonBackgroundColor,
  });

  @override
  State<SelectBox> createState() => _SelectBoxState();
}

class _SelectBoxState extends State<SelectBox> {
  String? selectedValue;
  bool isExpanded = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: widget.backgroundColor,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () {
            setState(() {
              isExpanded = !isExpanded;
            });
          },
          borderRadius: BorderRadius.circular(8),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 12,
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      selectedValue ?? widget.placeholder,
                      style: TextStyle(
                        color: selectedValue == null
                            ? widget.textColor.withOpacity(0.6)
                            : widget.textColor,
                        fontSize: widget.fontSize,
                      ),
                    ),
                    Icon(
                      isExpanded
                          ? Icons.keyboard_arrow_up
                          : Icons.keyboard_arrow_down,
                      color: widget.arrowColor,
                    ),
                  ],
                ),
              ),
              if (isExpanded)
                Container(
                  decoration: BoxDecoration(
                    color: widget.backgroundColor,
                    borderRadius: const BorderRadius.only(
                      bottomLeft: Radius.circular(8),
                      bottomRight: Radius.circular(8),
                    ),
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: widget.items.map((item) {
                      return InkWell(
                        onTap: () {
                          setState(() {
                            selectedValue = item;
                            isExpanded = false;
                          });
                          widget.onChanged?.call(item);
                        },
                        child: Container(
                          width: double.infinity,
                          padding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 12,
                          ),
                          child: Text(
                            item,
                            style: TextStyle(
                              color: selectedValue == item
                                  ? widget.textColor
                                  : widget.textColor.withOpacity(0.5),
                              fontSize: widget.fontSize,
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
