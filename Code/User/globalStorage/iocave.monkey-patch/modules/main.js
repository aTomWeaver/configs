require.config({
    paths: {
        "customize-ui" : "/home/tom/.config/Code/User/globalStorage/iocave.customize-ui/modules",
        "monkey-generated" : "/home/tom/.config/Code/User/globalStorage/iocave.monkey-patch/modules"
    }
});

define(["monkey-generated/entrypoint-main", "customize-ui/title-bar-main-process"], function (){});