# Structure:
Read by owner - 400
Write by owner - 200
Execute by owner - 100
Read by group - 040
Write by group - 020
Execute by group - 010
Read by others - 004
Write by others - 002
Execute by others - 001

--

# Common Modes:

*Permission Mode*	   |       *Description*
chmod 751	+rwx for owner, +rx for group, +x for others
chmod 755	+rwx for owner, +rwx for group, +rx for others
chmod 744	+wx for owner, no permissions for group, +r for others
chmod 711	+rwx for owner, no permissions for group, +x for others
chmod 700	+rwx for owner, no permissions for group or others
chmod 640	+rwx for owner, +r for group, no permissions for others
chmod 644	+rw for owner, no permissions for group, +r for others
chmod 777	+rwx for owner, +rwx for group, +rwx for others
chmod 666	+rw for owner, +rw for group, +rw for others
chmod 600	+rw for owner, no permissions for group or others
chmod 400	+r for owner, no permissions for group or others
