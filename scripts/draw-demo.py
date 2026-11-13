"""Draw the original demo explorer on the renderer's registered canvas."""

from pathlib import Path
from PIL import Image, ImageDraw

PUBLIC = Path(__file__).resolve().parents[1] / "public"
SIZE = (1024, 1536)
SCALE = 2
INK = "#253f3c"
GREEN = "#519581"
LIGHT = "#9bd3ad"
GOLD = "#f4bd63"
SKIN = "#f5c492"
HAIR = "#865342"
layers = {}


def layer(name):
    image = Image.new("RGBA", tuple(v * SCALE for v in SIZE))
    layers[name] = image
    return ImageDraw.Draw(image)


def coords(values):
    return tuple(round(value * SCALE) for value in values)


def ellipse(draw, box, fill, outline=INK, width=8):
    draw.ellipse(coords(box), fill=fill, outline=outline, width=width * SCALE)


def line(draw, points, fill, width):
    draw.line([coords(point) for point in points], fill=fill, width=width * SCALE, joint="curve")


def shape(draw, points, fill, outline=INK, width=8):
    draw.polygon([coords(point) for point in points], fill=fill)
    if outline:
        line(draw, points + [points[0]], outline, width)


legs = layer("lower-body")
for x in (405, 540):
    shape(legs, [(x, 1020), (x + 110, 1020), (x + 99, 1350),
                 (x + 16, 1350)], "#e7a958")
    ellipse(legs, (x - 20, 1295, x + 111, 1441), "#324a47")
    line(legs, [(x, 1389), (x + 84, 1389)], LIGHT, 8)

body = layer("body")
shape(body, [(375, 590), (625, 588), (727, 715), (667, 998),
             (688, 1122), (333, 1122), (359, 977), (309, 733)], GREEN)
shape(body, [(454, 586), (576, 586), (589, 696), (505, 741),
             (428, 690)], SKIN)
ellipse(body, (302, 272, 732, 631), HAIR)
ellipse(body, (312, 452, 395, 526), SKIN)
ellipse(body, (633, 439, 715, 515), SKIN)
ellipse(body, (341, 309, 685, 621), SKIN)
ellipse(body, (365, 476, 392, 494), "#e3a476", None)
ellipse(body, (633, 469, 660, 488), "#e3a476", None)
line(body, [(500, 542), (510, 547), (522, 547), (534, 540)], "#82484b", 7)
line(body, [(397, 410), (418, 402), (443, 406)], HAIR, 9)
line(body, [(569, 392), (594, 384), (619, 390)], HAIR, 9)
shape(body, [(315, 423), (320, 338), (391, 273), (572, 269), (666, 322),
             (701, 407), (644, 372), (591, 349), (540, 377), (487, 354),
             (446, 390), (412, 361), (364, 408)], HAIR)
ellipse(body, (304, 218, 716, 364), GREEN)
ellipse(body, (344, 137, 656, 321), LIGHT)
shape(body, [(361, 278), (631, 262), (665, 302), (613, 334),
             (372, 336), (340, 312)], GREEN)
ellipse(body, (475, 271, 550, 337), GOLD)
shape(body, [(514, 281), (529, 304), (514, 326), (499, 304)], "#fff4c4", None)
line(body, [(374, 978), (646, 978)], INK, 15)
ellipse(body, (477, 944, 545, 1013), GOLD)

left_cape = layer("cape-left")
shape(left_cape, [(376, 636), (432, 663), (381, 879), (322, 1083),
                  (279, 1031), (295, 798)], "#367569")
line(left_cape, [(376, 671), (341, 839), (300, 1013)], LIGHT, 7)
right_cape = layer("cape-right")
shape(right_cape, [(607, 629), (687, 658), (727, 789), (750, 1030),
                   (686, 1086), (632, 904)], "#367569")
line(right_cape, [(670, 675), (703, 812), (719, 1018)], LIGHT, 7)

for name, x, y, direction in (("braid-left", 346, 530, -1), ("braid-right", 678, 517, 1)):
    braid = layer(name)
    for index in range(6):
        center = x + direction * index * 4
        ellipse(braid, (center - 28, y + 40 * index, center + 28, y + 73 + 40 * index), HAIR)
    ellipse(braid, (center - 25, y + 241, center + 25, y + 273), GOLD)

tip = layer("hat-tip")
shape(tip, [(632, 292), (736, 263), (792, 285), (747, 330),
            (669, 352)], LIGHT)
arm = layer("free-arm")
shape(arm, [(661, 668), (734, 676), (831, 874), (775, 938),
            (714, 871)], GREEN)
ellipse(arm, (766, 873, 852, 956), SKIN)
line(arm, [(759, 862), (816, 828)], LIGHT, 9)

staff = layer("staff")
line(staff, [(262, 687), (194, 1283)], INK, 38)
line(staff, [(262, 687), (194, 1283)], "#ca905b", 23)
ellipse(staff, (194, 572, 343, 729), INK)
ellipse(staff, (210, 587, 327, 713), GOLD)
shape(staff, [(270, 604), (293, 648), (269, 689), (246, 648)], "#fff4c4", None)
ellipse(staff, (226, 846, 319, 941), SKIN)

collar = layer("collar")
shape(collar, [(403, 626), (510, 670), (621, 621), (653, 685),
               (512, 754), (377, 682)], LIGHT)
ellipse(collar, (485, 681, 537, 737), GOLD)

PUBLIC.joinpath("layers").mkdir(parents=True, exist_ok=True)
for name, image in layers.items():
    image.resize(SIZE, Image.Resampling.LANCZOS).save(PUBLIC / "layers" / f"{name}.webp", lossless=True)

# The WebGL shader draws eyes dynamically. Paint an open-eye pose for fallback.
for x, y in ((433, 483), (592, 468)):
    ellipse(body, (x - 34, y - 34, x + 34, y + 36), "#fff8e4", INK, 5)
    ellipse(body, (x - 20, y - 26, x + 20, y + 31), "#306b7f", INK, 3)
    ellipse(body, (x - 9, y - 14, x + 9, y + 17), INK, None)
    ellipse(body, (x + 1, y - 20, x + 12, y - 9), "white", None)

preview = Image.new("RGBA", layers["body"].size)
for name in ("lower-body", "body", "cape-left", "cape-right", "collar", "braid-left",
             "braid-right", "hat-tip", "free-arm", "staff"):
    preview.alpha_composite(layers[name])
preview.resize(SIZE, Image.Resampling.LANCZOS).save(PUBLIC / "preview.webp", lossless=True)
