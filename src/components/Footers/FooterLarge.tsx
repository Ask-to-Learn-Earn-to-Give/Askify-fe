/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
// components

type FooterLargeProps = {
  title: string;
  description: string;
  links: any;
  socials: any;
  copyright: any;
};
export default function FooterLarge({
  title,
  description,
  links = [],
  socials = [],
  copyright,
}: FooterLargeProps) {
  return (
    <>
      <footer>
        <div className=" bg-transparent pb-6 pt-8 opacity-90">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap text-center lg:text-left">
              <div className="w-full px-4 lg:w-6/12">
                {/* <p className="text-twitter-regular">1</p>
                <p className="text-facebook-regular">2</p>
                <p className="text-telegram-regular">3</p>
                <p className="text-discord-regular">4</p> */}
                <h4 className="mt-4 font-extrabold tracking-tight text-gray-900 dark:text-white">
                  {title}
                </h4>
                <h5 className="mb-2 mt-1 text-slate-500">{description}</h5>
                <div className="mb-6 mt-6 lg:mb-0">
                  {socials?.map((prop: any, key: number) => {
                    return (
                      <Link
                        href={prop.link}
                        key={key}
                        target={`${prop.target}`}
                        type="button"
                      >
                        <p
                          className={
                            ' bg-white' +
                            ' ' +
                            'text-' +
                            prop.icon +
                            '-regular align-center mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full font-normal shadow-lg outline-none focus:outline-none'
                          }
                        >
                          <i className={'fab fa-' + prop.icon}></i>
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="items-top mb-6 flex flex-wrap">
                  {links?.map((prop: any, key: number) => {
                    return (
                      <div
                        className="ml-auto w-full px-4 text-gray-900 dark:text-gray-300 lg:w-4/12"
                        key={key}
                      >
                        <span className="mb-2 block text-xs font-bold uppercase">
                          {prop.name}
                        </span>
                        <ul className="list-unstyled">
                          {(prop?.items || []).map(
                            (itemProp: any, itemKey: number) => {
                              if (itemProp.href) {
                                return (
                                  <Link
                                    href={itemProp.href}
                                    key={itemKey}
                                    target={`${itemProp.target}`}
                                  >
                                    <p className="block pb-2 text-sm text-gray-700 hover:text-slate-500 dark:text-gray-300">
                                      {itemProp.children}
                                    </p>
                                  </Link>
                                );
                              } else {
                                return (
                                  <a
                                    key={itemKey}
                                    target={`${itemProp.target}`}
                                    className="block pb-2 text-sm text-slate-500 hover:text-slate-700"
                                  />
                                );
                              }
                            }
                          )}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <hr className="my-6 border-slate-200" />
            <div className="flex flex-wrap items-center justify-center md:justify-between">
              <div className="mx-auto w-full px-4 text-center md:w-4/12">
                <div className="py-1 text-sm text-slate-500">{copyright}</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

FooterLarge.defaultProps = {
  links: [],
  socials: [],
};
FooterLarge.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  copyright: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      // array of properties to pass to the link object
      // if you pass a prop named to, the link will be
      // generated using Link from react-router-dom
      items: PropTypes.arrayOf(PropTypes.object),
    })
  ),
  socials: PropTypes.arrayOf(
    // this will generate an anchor with target blank to the given link
    PropTypes.shape({
      icon: PropTypes.oneOf([
        'facebook',
        'twitter',
        'instagram',
        'dribbble',
        'github',
        'telegram',
        'discord',
      ]),
      link: PropTypes.string,
    })
  ),
};
