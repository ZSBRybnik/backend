const Builder = @import("std").build.Builder;

pub fn build(builder: *Builder) void {
    const mode = builder.standardReleaseOptions();
    const lib = builder.addStaticLibrary("native-addon-zig", "source/main.zig");
    lib.setBuildMode(mode);
    lib.install();
    var main_tests = builder.addTest("source/main.zig");
    main_tests.setBuildMode(mode);
    const test_step = builder.step("test", "Run library tests");
    test_step.dependOn(&main_tests.step);
}
