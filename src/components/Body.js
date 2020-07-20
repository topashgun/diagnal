import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import ReactTooltip from "react-tooltip";

export default class Body extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            searchTextBasedContent: [],
            showDiv: 9,
            contentDivHeight: '',
            pageNumber: 1,
            content: [],
            endOfPage: ''
        }
        this.myRef = React.createRef();
        this.getPageContent = this.getPageContent.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    async getPageContent() {
        var pageNumber = this.state.pageNumber;
        let contentRequire = '';
        let reachedEndOfPage = false;
        try {
            contentRequire = require('../API/CONTENTLISTINGPAGE-PAGE' + (pageNumber + 1) + '.json').page["content-items"].content;
            reachedEndOfPage = false;
        } catch (err) {
            reachedEndOfPage = true;
        }

        await this.setState({
            content: [...this.state.content, ...contentRequire],
            pageNumber: reachedEndOfPage ? pageNumber : (pageNumber + 1),
            endOfPage: reachedEndOfPage ? reachedEndOfPage : this.state.endOfPage
        })
        return "done"
    }

    async onScroll() {
        ReactTooltip.hide();
        const scrollTop = this.myRef.current.scrollTop
        scrollTop == 0
            ? document.getElementById('gradientBackground').style.height = '0px'
            : document.getElementById('gradientBackground').style.height = '30px'
        var getHeight = scrollTop / this.state.contentDivHeight;
        var showDiv = ((Math.ceil(getHeight / 1) * 1) + 4) * 3;
        if (showDiv != this.state.showDiv) {
            if (isFinite(showDiv) && !this.state.endOfPage) {
                if ((this.state.content.length - showDiv) < 15 && (this.state.content.length - showDiv) > 0) {
                    await this.getPageContent();
                }
            }
            this.setState({
                showDiv: showDiv
            })
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.searchText != state.search) {
            const items = state.content.filter((data) => {
                if (props.searchText.length == 0) {
                    return data;
                } else if (data.name.toLowerCase().includes(props.searchText.toLowerCase())) {
                    return data;
                }
            })
            return {
                search: props.searchText,
                searchTextBasedContent: items
            }
        }
    }

    componentDidMount() {
        this.getPageContent();
        document.getElementById('container').style.height = (window.innerHeight - 192) + "px";
    }

    componentDidUpdate() {
        if (this.state.search.length != 0 && this.state.searchTextBasedContent.length == 0) {

        } else {
            if (this.state.contentDivHeight != document.querySelector('.contentDiv[data-id="0"]').scrollHeight) {
                this.setState({
                    contentDivHeight: document.querySelector('.contentDiv[data-id="0"]').scrollHeight
                })
            }
        }
    }

    render() {
        var content;
        this.state.search.length == 0
            ? content = this.state.content
            : content = this.state.searchTextBasedContent;
        return (
            <div id="container" ref={this.myRef} onScroll={this.onScroll} style={{ overflow: 'scroll' }} >
                <div className="row" id="gradientBackground" style={{ height: "0px" }}></div>
                <div className="row contentRow" id="contentRow">
                    {
                        content.length == 0
                            ? <div className="col-12"><div class="alert alert-light mt-3 text-center noResultsFound" role="alert">No Results Found !</div></div>
                            : content.map((content, index) => {
                                let image_path = '';
                                let id = content + index;
                                try {
                                    image_path = require('../Slices/' + content["poster-image"]);
                                } catch (err) {
                                    image_path = require('../Slices/placeholder_for_missing_posters.png');  //Missing poster image for images not available in slices
                                }
                                return (
                                    <div className={`col-4 col-lg-3 p-0 text-lg-center contentDiv ${(index < this.state.showDiv) ? '' : 'd-none'}`} key={index} data-id={index}>
                                        <LazyLoad offsetBottom={500}>
                                            <div>
                                                <img src={image_path} className="img-fluid posterImage"></img>
                                                <p className='contentName' data-tip data-for={id}>{content.name}</p>
                                                <ReactTooltip id={id} place="bottom" effect="solid">
                                                    {content.name}
                                                </ReactTooltip>
                                            </div>
                                        </LazyLoad>
                                    </div>
                                )
                            })
                    }
                </div>
            </div >
        )
    }
}
