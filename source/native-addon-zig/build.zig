const Builder = @import("std").build.Builder;

pub fn build(builder: *Builder) void {
    const mode = builder.standardReleaseOptions();
    const lib = builder.addSharedLibrary("native-addon-zig", "source/index.zig", builder.version(0, 0, 1));
    lib.setBuildMode(mode);
    lib.install();
    var main_tests = builder.addTest("source/index.zig");
    main_tests.setBuildMode(mode);
    const test_step = builder.step("test", "Run library tests");
    test_step.dependOn(&main_tests.step);
}
