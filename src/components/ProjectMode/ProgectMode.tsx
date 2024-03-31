import React from "react"
import { ProjectModesList, projectModes } from "../../constants/projectModes"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { setProjectMode } from "../../store/projectModeReducer"
import { projectModeProps } from "./projectModeProps"


export function ProgectMode(props: projectModeProps) {
    const dispatch = useAppDispatch()
    const projectMode = useAppSelector((state) => state.projectMode.projectMode)

    const { choosable } = props

    const handleProjectMode = (newProjectMode: ProjectModesList) => {
        dispatch(setProjectMode(newProjectMode));
    };

    function onClickModes(mode: ProjectModesList) {
        handleProjectMode(mode)
    }

    return (
        <>
            {(projectMode)&&(
                <>
                    Project mode:
                    {projectModes.map((mode, index) => (
                        <React.Fragment key={`mode${index}`}>
                            <span>  </span>
                            <span 
                                onClick={() => (choosable)?(onClickModes(mode as ProjectModesList)):('')}
                                style={{
                                    color: (projectMode === mode)?('green'):('black'),
                                    textDecorationLine: (projectMode === mode)?('none'):('line-through'),
                                    fontWeight: (projectMode === mode)?('bold'):('normal')
                                }}
                            >
                                {mode}
                            </span>
                        </React.Fragment>
                    ))}
                </>
            )}
        </>
    )
}
