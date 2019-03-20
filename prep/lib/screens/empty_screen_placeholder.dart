import 'package:flutter/material.dart';

class EmptyScreenPlaceholder extends StatelessWidget {
  final String title;
  final String subtitle;

  EmptyScreenPlaceholder(this.title, this.subtitle);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Text(
            title,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 30.0,
              color: Colors.grey,
              fontWeight: FontWeight.bold,
            ),
          ),
        Padding(
          key: Key('padding'),
          padding: EdgeInsets.all(20.0),
        ),
          Text(
            subtitle,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 25.0,
              color: Colors.grey,
            ),
          ),
        ],
      )
    );
  }
}