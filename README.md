This site is build for testing the security report accuracy of FortiAnalyzer during upgrade.

How to use:
1 Open the test website ( http://your_server_to_deploy_it/rtm/)  connect to old version of ForiAnalyzer, choose FortiAnalyzer model, and run reports (totally 500 reports).
2 Input the new version which you want to upgrade to, click "upgrade".
3 After upgrade finished, run reports again.
4 Click compare to compare the difference.

Technologies using to developer this tool:
Python, DJango 1.5, JQuery UI.

To run in developer server mode,
In src file path:
python manage.py runserver

To run in production server mode:
Deploy your server, than
 http://your_server_to_deploy_it/rtm/
