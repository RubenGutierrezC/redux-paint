import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { hide } from "../redux/modals/slice"
import { getProjectsList } from "../redux/projectLists/getProjectsList";
import { projectsListSelector } from "../redux/projectLists/selectors";
import { loadProject } from "../redux/strokes/loadProject";
import { Project } from "../types/types";

export const ProjectsModal = () => {
    const dispatch = useDispatch()

    const projectList = useSelector(projectsListSelector)

    useEffect(() => {
        dispatch(getProjectsList())
    }, [])

    const onLoadProject = (projectId: string) => {
        dispatch(loadProject(projectId))
        dispatch(hide())
    }

    return (
        <div className='window modal-panel'>
            <div className="title-bar">
                <div className="title-bar-text">Counter</div>
                <div className="title-bar-controls">
                    <button
                        aria-label='Close'
                        onClick={() => dispatch(hide())}
                    />
                </div>
            </div>
            <div className="projects-container">
                {
                    (projectList?.projects || []).map((project: Project) => 
                         (
                            <div
                                key={project.id}
                                onClick={() => onLoadProject(project.id)}
                                className='project-card'
                            >
                            <img src={project.image} alt="thumbnail" />
                            <div>{project.name}</div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}
