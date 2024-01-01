const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getSection = async (req, res) => {
  try {
    const viewSection = await prisma.section.findMany();
    return res.status(200).send(viewSection);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server" });
  }
};

const getSectionById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingSection = await prisma.section.findUnique({ where: { id } });
    if (!existingSection) {
      return res.status(404).json({ message: `Section ${id} not found` });
    }
    return res.status(200).send(existingSection);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addSection = async (req, res) => {
  try {
    const id = Number(req.body.classId);
    const existingClass = await prisma.class.findUnique({ where: { id } });
    if (!existingClass) {
      return res.status(404).json({ message: `Class ${id} not found` });
    }
    const createSection = await prisma.section.create({
      data: {
        classId: id,
        sectionName: req.body.sectionName,
      },
    });
    return res.status(200).json(createSection);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const updateSection = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingSection = await prisma.section.findUnique({ where: { id } });
    if (!existingSection) {
      return res.status(404).json({ message: `Section ${id} not found` });
    }
    const updateSection = await prisma.section.update({
      data: {
        classId:req.body.classId,
        sectionName: req.body.sectionName,
      },
      where: {
        id,
      },
    });
    return res.status(200).json(updateSection);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteSection = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingSection = await prisma.section.findUnique({ where: { id } });
    if (!existingSection) {
      return res.status(404).json({ message: `Section ${id} not found` });
    }
    const delSection = await prisma.section.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: `Section ${id} is deleted` });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getSection,
  getSectionById,
  addSection,
  updateSection,
  deleteSection,
};
