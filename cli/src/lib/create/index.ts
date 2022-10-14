import { IProjectMeta } from "../typedefines";
import { createCreateContext } from "../utils/factory";
import CreateProject from "./createProject";
import ProjectMeta from '../../config/projectMeta';

function create(projectName:string,options:any){
  options.projectName = projectName;
  new CreateProject(createCreateContext(options,process.cwd(),ProjectMeta as IProjectMeta)).run();
}

module.exports = create;