const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getSchool = async (req, res) => {
  try {
    const viewSchool = await prisma.school.findMany({
      include: {
        class: true,
      },
    });
    return res.status(200).send(viewSchool);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server" });
  }
};

const getSchoolById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingSchool = await prisma.school.findUnique({ where: { id } });
    if (!existingSchool) {
      return res.status(404).json({ message: `School ${id} not found` });
    }
    return res.status(200).send(existingSchool);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addSchool = async (req, res) => {
  try {
    const createSchool = await prisma.school.create({
      data: {
        schoolName: req.body.schoolName,
      },
    });
    return res.status(200).json(createSchool);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const updateSchool = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingSchool = await prisma.school.findUnique({ where: { id } });
    if (!existingSchool) {
      return res.status(404).json({ message: `School ${id} not found` });
    }
    const updateSchool = await prisma.school.update({
      data: {
        schoolName: req.body.schoolName,
      },
      where: {
        id,
      },
    });
    return res.status(200).json(updateSchool);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteSchool = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingSchool = await prisma.school.findUnique({ where: { id } });
    if (!existingSchool) {
      return res.status(404).json({ message: `School ${id} not found` });
    }
    const delSchool = await prisma.school.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: `School ${id} is deleted` });
  } catch (error) {
    console.log(error.code);
    return res.status(200).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getSchool,
  getSchoolById,
  addSchool,
  updateSchool,
  deleteSchool,
};
