import fs from 'fs/promises';
import path from 'path';

export interface Project {
  id: number;
  title: string;
  description: string;
  level: 1 | 2 | 3;           // 项目等级
  origin: number;             // 初始能量
  idea: number;              // 灵感值
  cost: number;              // 开销
  sponsorship: number;       // 赞助
  workHours: number;         // 投入工时
  heat: number;              // 热度
  dailyActive: number;       // 日活
  createdAt: string;         // 创建时间
  status: 'active' | 'pending';
  energy?: number;           // 计算得出，不存储
}

class ProjectService {
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(process.cwd(), 'src/data/projects.json');
  }

  // 计算初始能量
  private calculateOrigin(level: number): number {
    const originMap = {
      1: 6,
      2: 30,
      3: 90
    };
    return originMap[level as 1 | 2 | 3] || 6;
  }

  // 计算自然损耗
  private calculateNaturalLoss(createdAt: string): number {
    const days = Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
    return days;
  }

  // 计算项目能量
  private calculateEnergy(project: Project): number {
    // 计算自然损耗
    const naturalLoss = this.calculateNaturalLoss(project.createdAt);
    
    // 计算分子：初始能量 + 灵感值 + 赞助 + 热度
    const numerator = project.origin + project.idea + project.sponsorship + project.heat;
    
    // 计算分母：(开销 + 工时) / 项目等级
    const denominator = (project.cost + project.workHours) / project.level;
    
    // 防止除以零
    if (denominator === 0) {
      return numerator - naturalLoss;
    }
    
    // 最终能量 = (分子 / 分母) - 自然损耗
    const energy = Math.max(0, (numerator / denominator) - naturalLoss);
    
    return Math.round(energy);
  }

  async getAllProjects(): Promise<Project[]> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      const { projects } = JSON.parse(data);
      return projects.map((project: Project) => {
        const origin = this.calculateOrigin(project.level);
        return {
          ...project,
          origin,  // 添加初始能量
          energy: this.calculateEnergy({
            ...project,
            origin  // 确保计算能量时使用正确的初始能量
          })
        };
      });
    } catch (error) {
      console.error('Error reading projects:', error);
      return [];
    }
  }

  async updateProject(project: Omit<Project, 'energy'>): Promise<boolean> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      const { projects } = JSON.parse(data);
      const index = projects.findIndex((p: Project) => p.id === project.id);
      
      if (index === -1) return false;
      
      // 更新时不保存energy字段
      const { energy, ...projectWithoutEnergy } = project as Project;
      projects[index] = {
        ...projects[index],
        ...projectWithoutEnergy,
      };

      await fs.writeFile(
        this.dataPath,
        JSON.stringify({ projects }, null, 2),
        'utf-8'
      );
      
      return true;
    } catch (error) {
      console.error('Error updating project:', error);
      return false;
    }
  }

  async addProject(project: Omit<Project, 'id' | 'energy'>): Promise<Project | null> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      const { projects } = JSON.parse(data);
      
      const newId = Math.max(...projects.map((p: Project) => p.id)) + 1;
      const newProject = {
        ...project,
        id: newId,
      };
      
      projects.push(newProject);
      
      await fs.writeFile(
        this.dataPath,
        JSON.stringify({ projects }, null, 2),
        'utf-8'
      );
      
      // 返回时计算并包含energy
      return {
        ...newProject,
        energy: this.calculateEnergy(newProject)
      };
    } catch (error) {
      console.error('Error adding project:', error);
      return null;
    }
  }

  async deleteProject(id: number): Promise<boolean> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      const { projects } = JSON.parse(data);
      
      const filteredProjects = projects.filter((p: Project) => p.id !== id);
      
      await fs.writeFile(
        this.dataPath,
        JSON.stringify({ projects: filteredProjects }, null, 2),
        'utf-8'
      );
      
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  }
}

export const projectService = new ProjectService(); 