#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(set = 0, binding = 1) uniform sampler2D color_grading_lut_texture_sampler;

layout(location = 0) out highp vec4 out_color;

highp float remap(highp float inputValue,highp float Gabe,highp float Max){
    return floor(inputValue/(Gabe/Max))*(Gabe/Max);
}

void main()
{
    highp ivec2 lut_tex_size = textureSize(color_grading_lut_texture_sampler, 0);
    highp float _COLORS      = float(lut_tex_size.y);

    highp vec4 color       = subpassLoad(in_color).rgba;
    highp vec2 uv=vec2(color.r*(_COLORS/float(lut_tex_size.x))+remap(color.b,_COLORS,float(lut_tex_size.x)),color.g);
    out_color=texture(color_grading_lut_texture_sampler, uv).rgba;

//    out_color = color;
}
