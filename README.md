https://preview--visual-media-command.lovable.app/dashboard/



+------------------+        1     N     +------------------+
|     Client       |------------------<|      Video        |
+------------------+                   +------------------+
| id               |                   | id               |
| name             |                   | title            |
| nif              |                   | url              |
| address          |                   | duration         |
| website          |                   | client_id (FK)   |
| contact_name     |                   +------------------+
| contact_email    |
| contact_phone    |
| observations     |
+------------------+

      1
+---------------+      N
|    Place      |-------------------------+
+---------------+                         |
| id            |                         |
| name          |                         |
| nif           |                         |        N       1
| address       |                         +------------<-------------+
| type          |                                      |  Device    |
| contact_name  |                                      +------------+
| contact_email |                                      | id         |
| contact_phone |                                      | name       |
| contract_type |                                      | login      |
| contract_value|                                      | password   |
| observations  |                                      | location   |
+---------------+                                      | resolution |
                                                       | place_id   |
                                                       +------------+

       N                                      N
+-------------+       N:N     +-------------------------+       N
|   Device    |-------------->|     DeviceVideo         |<--------------| Video |
+-------------+               +-------------------------+               +-------+
| id          |               | id                      |
| name        |               | device_id (FK)          |
| ...         |               | video_id (FK)           |
| schedule    |               | order / start_time / ...|
+-------------+               +-------------------------+
