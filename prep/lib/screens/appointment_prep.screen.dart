import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'information_parser.screen.dart';
import 'faq_parser.screen.dart';
import './category.screen.dart';

class AppointmentPrep extends StatefulWidget {
  final String _testID;
  final String _appointmentID;
  final DateTime _appointmentDatetime;

  AppointmentPrep(this._testID, this._appointmentID, this._appointmentDatetime);

  @override
  _AppointmentPrepState createState() => _AppointmentPrepState();
}

class _AppointmentPrepState extends State<AppointmentPrep> {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder(
      stream: Firestore.instance.collection('tests')
          .document(widget._testID).collection('prepCards').snapshots(),
      builder: (context, snapshot) {
        if (!snapshot.hasData) return const Align(alignment: Alignment.topCenter, child: LinearProgressIndicator(),);
          return GridView.builder(
            padding: EdgeInsets.only(top: 10),
            //gridDelegate: new SliverGridDelegateWithMaxCrossAxisExtent(maxCrossAxisExtent: 300, childAspectRatio: (3/2)),
            gridDelegate: new SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: (MediaQuery.of(context).orientation == Orientation.portrait) ? 2 : 3, childAspectRatio: (3/1.5)),
            itemCount: snapshot.data.documents.length,
            itemBuilder: (context, index) =>_buildGrid(context,snapshot.data.documents[index])
          );
        }
    );
  }

  Widget _buildGrid(BuildContext context, DocumentSnapshot document) {
    return GridTile(
      child: CategoryCard(document['contents'],
        document['title'],
        document['type'],
        widget._testID,
        widget._appointmentID,
        Colors.white,
        Icons.android,
        widget._appointmentDatetime
      ),
    );
  }
}

class CategoryExpansionTile extends StatelessWidget {
  final String name;
  final List<Widget> contents;
  final Color color;
  final IconData icon;

  CategoryExpansionTile(this.name, this.contents, this.color, this.icon);

  @override
  Widget build(BuildContext context) {
    return ExpansionTile(
      initiallyExpanded: true,
      title: ListTile(
        contentPadding: EdgeInsets.only(left: 0.0),
        leading: CircleAvatar(
          backgroundColor: color,
          child: Icon(
            icon,
            color: Colors.white,
          ),
        ),
        title: Text(name),
      ),
      children: contents
    );
  }
}

class CategoryCard extends StatelessWidget {
  final String contents;
  final String title;
  final String type;
  final String _testID;
  final String _appointmentID;
  final Color color;
  final IconData icon;
  final DateTime _appointmentDatetime;

  CategoryCard(this.contents, this.title, this.type, this._testID, this._appointmentID, this.color, this.icon, this._appointmentDatetime);

  Future _navigate(dynamic context) {
    //TODO: add links to the relevant pages

    switch (type) {
      case "informations":
        return Navigator.push(context, MaterialPageRoute(builder: (context) => InformationParser(_testID, contents)));
      case "categoryList":
        return null;
      case "recipeView":
        return null;
      default:
        return Navigator.push(context, MaterialPageRoute(builder: (context) => FaqParser(_testID, _appointmentID, _appointmentDatetime)));
    }
  }

  CircleAvatar _getIcon(){
    if (type == "categoryList") {
        return CircleAvatar(
          backgroundColor: Colors.blue,
          child: Icon(
            Icons.list,
            color: Colors.white,
          ),
        );
    } else if (type == "informations") {
      return CircleAvatar(
        backgroundColor: Colors.deepPurple,
        child: Icon(
          Icons.info,
          color: Colors.white,
        ),
      );
    } else if (type == "faqs") {
      return CircleAvatar(
        backgroundColor: Colors.green,
        child: Icon(
          Icons.question_answer,
          color: Colors.white,
        ),
      );
    } else {
      return CircleAvatar(
        backgroundColor: Colors.red,
        child: Icon(
          Icons.fastfood,
          color: Colors.white,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(right: 10.0, left: 10.0, top: 5.0, bottom: 5.0),
        child: Card(
          color: color,
          elevation: 3.0,
          child: InkWell(
            onTap: () {
              _navigate(context);
            },
            child: Center(
              child: ListTile(
                leading: _getIcon(),
                title: Text(
                  title,
                  maxLines: 3,
                ),
              ),
            )
          ),
        ),
    );
  }
}