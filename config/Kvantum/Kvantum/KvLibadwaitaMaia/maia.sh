find . -type f -name '*.svg' -exec sed -i \
    "s/#3584e4/#16a085/Ig;\
    s/#3c84f7/#16a585/Ig;\
    s/#587392/#3f776c/Ig;\
    s/#81abdf/#70c2ad/Ig;\
    s/#4990e7/#159f7f/Ig;\
    s/#4285f4/#19b391/Ig;\
    s/#93cee9/#a6d9cc/Ig;\
    s/#3daee9/#21e0b6/Ig" {} \;
find . -type f -name '*.kvconfig' -exec sed -i \
    "s/#3584e4/#16a085/Ig;\
    s/#3c84f7/#16a585/Ig;\
    s/#587392/#3f776c/Ig;\
    s/#81abdf/#70c2ad/Ig;\
    s/#4990e7/#159f7f/Ig;\
    s/#4285f4/#19b391/Ig;\
    s/#93cee9/#a6d9cc/Ig;\
    s/#3daee9/#21e0b6/Ig" {} \;
