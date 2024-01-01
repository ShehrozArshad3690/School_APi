const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getClass = async (req, res) => {
  try {
    const viewClass = await prisma.class.findMany({
      include: {
        Section:true
      },
    });
    return res.status(200).send(viewClass);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server" });
  }
};

const getClassById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingClass = await prisma.class.findUnique({ where: { id } });
    if (!existingClass) {
      return res.status(404).json({ message: `Class ${id} not found` });
    }
    return res.status(200).send(existingClass);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addClass = async (req, res) => {
  try {
    const id = Number(req.body.schoolId);
    const existingSchool = await prisma.school.findUnique({ where: { id } });
    if (!existingSchool) {
      return res.status(404).json({ message: "School not found" });
    }
    const createClass = await prisma.class.create({
      data: {
        schoolId: id,
        className: req.body.className,
      },
    });
    return res.status(200).json(createClass);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const updateClass = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingClass = await prisma.class.findUnique({ where: { id } });
    if (!existingClass) {
      return res.status(404).json({ message: `Class ${id} not found` });
    }
    const updateClass = await prisma.class.update({
      data: {
        schoolId:req.body.schoolId,
        className: req.body.className,
      },
      where: {
        id,
      },
    });
    return res.status(200).json(updateClass);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteClass = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingClass = await prisma.class.findUnique({ where: { id } });
    if (!existingClass) {
      return res.status(404).json({ message: `Class ${id} not found` });
    }
    const delClass = await prisma.class.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: `Class ${id} is deleted` });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getClass,
  getClassById,
  addClass,
  updateClass,
  deleteClass,
};
