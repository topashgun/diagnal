import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons'

export default class header extends Component {
    constructor() {
        super()
        this.state = {
            showHeading: true,
            showSearch: false
        }
        this.changeSearchFlag = this.changeSearchFlag.bind(this);
    }
    async changeSearchFlag() {
        await this.setState({
            showSearch: this.state.showSearch ? false : true
        })
        await this.setState({
            showHeading: this.state.showSearch ? false : true
        })
    }
    componentDidUpdate() {
        if (this.state.showSearch) {
            this.nameInput.focus()
        }
    }
    render() {
        return (
            <div className="row headerRow">
                <div className="col-1 p-0">
                    <button type="button" class="btn btn-light btn-block px-0 customButton text-left">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </div>
                <div className="col-10" style={{ height: "38px", display: 'flex', alignItems: 'center' }}>
                    <div class={`alert alert-light p-0 m-0 text-left ${this.state.showHeading ? '' : 'd-none'}`} id="heading" role="alert">
                        Romantic Comedy
                    </div>
                    <input type="text" ref={(input) => { this.nameInput = input; }} class={`form-control ${this.state.showSearch ? '' : 'd-none'}`} id="Search" type="search" placeholder="Search" aria-label="Search" onChange={this.props.updateSearchText} />
                </div>
                <div className="col-1 p-0">
                    <button type="button" class="btn btn-light btn-block px-0 customButton text-right" onClick={this.changeSearchFlag}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                {/* <div className="col-sm-4 offset-sm-8 p-0">
                    <button type="button" class="btn btn-primary">Primary</button>
                    <input className="form-control mr-sm-2" id="Search" type="search" placeholder="Search" aria-label="Search" onChange={this.props.updateSearchText} />
                </div> */}
            </div >
        )
    }
}
